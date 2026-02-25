#!/usr/bin/env python3
"""
Merges partial verse files into final chapter JSON files.
Partial files live in: src/data/verses/partial/chapter_NN_vXXX_vYYY.json
Final files live in:   src/data/verses/chapter_NN.json

Existing verses in final files are PRESERVED (not overwritten by partials).
Run after each wave of agents completes.
"""
import json, glob, os, sys

VERSES_DIR = os.path.join(os.path.dirname(__file__), "../src/data/verses")
PARTIAL_DIR = os.path.join(VERSES_DIR, "partial")

# Verses to preserve from existing files (do not overwrite with partials)
PRESERVE = {
    1: {1, 2, 47},
    2: {1, 11, 20, 47, 48, 55},
}

def merge_chapter(ch):
    partial_pattern = os.path.join(PARTIAL_DIR, f"chapter_{ch:02d}_v*.json")
    partials = sorted(glob.glob(partial_pattern))
    if not partials:
        return 0

    final_path = os.path.join(VERSES_DIR, f"chapter_{ch:02d}.json")

    # Load existing final file
    existing_verses = {}
    if os.path.exists(final_path):
        with open(final_path, "r", encoding="utf-8") as f:
            existing_data = json.load(f)
        for v in existing_data.get("verses", []):
            existing_verses[v["verse"]] = v

    # Load all partials
    new_verses = {}
    for pf in partials:
        with open(pf, "r", encoding="utf-8") as f:
            data = json.load(f)
        for v in data.get("verses", []):
            new_verses[v["verse"]] = v

    # Merge: preserved verses win over partials; partials fill gaps
    preserve_set = PRESERVE.get(ch, set())
    merged = {}
    merged.update(new_verses)
    for vnum, vdata in existing_verses.items():
        if vnum in preserve_set or vnum not in new_verses:
            merged[vnum] = vdata  # keep existing

    all_verses = sorted(merged.values(), key=lambda v: v["verse"])

    final_data = {"chapter": ch, "verses": all_verses}
    with open(final_path, "w", encoding="utf-8") as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)

    return len(all_verses)

def main():
    chapters = range(1, 19)
    if len(sys.argv) > 1:
        chapters = [int(x) for x in sys.argv[1:]]

    total = 0
    for ch in chapters:
        count = merge_chapter(ch)
        if count:
            print(f"  Ch{ch:02d}: merged → {count} verses total in final file")
            total += count
    print(f"Done. {total} verses across merged chapters.")

if __name__ == "__main__":
    main()
