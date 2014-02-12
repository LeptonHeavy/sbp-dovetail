// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
//
} else {
    alert('This browser is too old or messed up to used make spiffy dovetails. Go get yourself the latest Mozilla or Chrome!');
}

// Reading local files: http://www.html5rocks.com/en/tutorials/file/dndfiles/
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    // files is a FileList of File objects. List some properties.
    var output = [];
    var reader = new FileReader();

    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong>  - ', f.size, ' bytes,<br>',
            'last modified: ',f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a','</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';

    reader.onload = function(event) {
        var contents = event.target.result;
        lines_of_sbp = parse_sbp(contents);
        document.getElementById('file_length').innerHTML = lines_of_sbp.length;
        find_toolpaths(lines_of_sbp, 'toolpath_list');
        document.getElementById('sbp_data').innerHTML = contents;
        document.getElementById('toolpath_list').style.display='block';
    };

    reader.onerror = function(event) {
        console.error("File could not be read! Code " + event.target.error.code);
    };

    reader.readAsText(files[0]);
}

function calc_pins(){
    var select_id = document.getElementById("toolpath_list");
    var selected_path = select_id.options[select_id.selectedIndex].value;
    parse_pins(selected_path);
    speed_data = MS("MS,1.5,0.5");
    document.getElementById('cut_rate').value = speed_data[0];
    document.getElementById('plunge_rate').value = speed_data[1];
    document.getElementById('dove_param_list').style.display='block';
}

function update_preview(){
    return false;
}