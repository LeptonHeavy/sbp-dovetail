var path_starts = Array();
var comment_lines = Array();
var pin_vectors = Array();
var pin_block_start;
var minX = 0,
    minY = 0,
    minZ = 0,
    maxX = 0,
    maxY = 0,
    maxZ = 0,
    pin_vectors = [];

function parse_sbp(raw_sbp) {
    var lines = raw_sbp.split("\n")
    return lines;
}

function find_toolpaths(lines, tp_select, sbp_data) {
    var numLines = lines.length;
    var i;
    var path_name = ""
    var output = Array();

    for (i = 0; i < numLines; i++) {
        var line = lines[i];
        if (line.indexOf('Toolpath Name') == 1) {
            path_name = line.substring(line.indexOf('=') + 1);
            output.push('<option value=' + path_name.trim() + '>' + path_name.trim() + '</option>');
            path_starts.push(i)
        }
    }
    document.getElementById(tp_select).innerHTML = '<OPTION selected value="item_1">Select Toolpath:</OPTION>\n' + output.join('\n' + '\n');
}

function parse_pins(path_to_parse) {
    lines_of_sbp = parse_sbp(document.getElementById("sbp_data").value);
    for (i = 0; i < path_starts.length; i++) {
        if (lines_of_sbp[path_starts[i]].indexOf(path_to_parse) >= 0) {
            pin_block_start = path_starts[i] + 2;
        }
    }
    var in_block = true;
    var cur_line = pin_block_start;
    while (in_block){
        line_data = lines_of_sbp[cur_line];
        cur_line++;
        var first_char = line_data.charAt(0)
        if (first_char =="'"){
            // then it's the comment at the end of the toolpath
            in_block = false;
        } else {
            var seq_type = line_data.split(",")[0];
            switch (seq_type) {
                case 'J2':
                    pin_vectors.push(J2(line_data));
                    break;
                case 'J3':
                    pin_vectors.push(J3(line_data));
                    break;
                case 'JX':
                    pin_vectors.push(JX(line_data));
                    break;
                case 'JY':
                    pin_vectors.push(JY(line_data));
                    break;
                case 'JZ':
                    pin_vectors.push(JZ(line_data));
                    break;
                case 'M2':
                    pin_vectors.push(M2(line_data));
                    break;
                case 'M3':
                    pin_vectors.push(M3(line_data));
                    break;
                case 'MX':
                    pin_vectors.push(MX(line_data));
                    break;
                case 'MY':
                    pin_vectors.push(MY(line_data));
                    break;
                case 'MZ':
                    pin_vectors.push(MZ(line_data));
                    break;
                case 'MS':
                    pin_vectors.push(MS(line_data));
                    break;
                default:
                    alert("Unknown Segment Type: " + seq_type);
            }
        }
    }
}


function find_comments(line_array) {
    var numLines = line_array.length;

    for (i = 0; i < numLines; i++) {
        var line = line_array[i];
        if (line.indexOf("'") == 0) {
            comment_lines.push(i);
        }
    };
}

function J2(seg) {
    // Jog in XY plane
    var parsed_coord = seg.split(",");
    return ["J2", parsed_coord[1], parsed_coord[2] ];
}

function J3(seg) {
    // Jog in 3 dimensions
    var parsed_coord = seg.split(",");
    return ["J3", parsed_coord[1], parsed_coord[2], parsed_coord[3] ];
}

function JX(seg) {
    // Jog on X-Axis
    var parsed_coord = seg.split(",");
    return ["JX", parsed_coord[1] ];
}

function JY(seg) {
    // Jog on Y-Axis
    var parsed_coord = seg.split(",");
    return ["JY", parsed_coord[1] ];
}

function JZ(seg) {
    // Jog on Z-Axis
    var parsed_coord = seg.split(",");
    return ["JZ", parsed_coord[1] ];
}

function M2(seg) {
    // Move/Cut on in XY plane
    var parsed_coord = seg.split(",");
    return ["M2", parsed_coord[1], parsed_coord[2] ];
}

function M3(seg) {
    // Move/Cut in 3 dimensions
    var parsed_coord = seg.split(",");
    return ["M3", parsed_coord[1], parsed_coord[2], parsed_coord[3] ];
}

function MX(seg) {
    // Move/Cut on X-Axis
    var parsed_coord = seg.split(",");
    return ["MX", parsed_coord[1] ];
}

function MY(seg) {
    // Move/Cut on Y-Axis}
    var parsed_coord = seg.split(",");
    return ["MY", parsed_coord[1] ];
}

function MZ(seg) {
    // Move/Cut on Z-Axis}
    var parsed_coord = seg.split(",");
    return ["MZ", parsed_coord[1] ];
}

function MS(seg) {
    // Set Speed xy,z
    var parsed_coord = seg.split(",");
    return ["MS", parsed_coord[1] , parsed_coord[2] ];
}
