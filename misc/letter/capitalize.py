from pandocfilters import toJSONFilter, BulletList, Plain, Str, RawBlock
import sys

def capitalize_item(item):
    if item['t'] == 'Plain':
        content = item['c'][0]
        if content['t'] != 'Str':
            return item
        return Plain([Str(content['c'].upper())])
    elif item['t'] == 'RawBlock':
        return RawBlock(item['c'][0], item['c'][1].upper())
    else:
        return item

def capitalize_list(key, value, format, meta):
    if key == 'BulletList':
        return BulletList([[capitalize_item(x[0])] for x in value if x != []])

if __name__ == "__main__":
  toJSONFilter(capitalize_list)
