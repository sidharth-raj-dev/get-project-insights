const fs = require('fs');
const path = require('path');

function print_file_content_of_this_file(filePath, transform) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.split('\n');

        for (let i = 0; i < lines.length; i++) {
            lines[i] = transform(lines[i]);
        }
    } catch (err) {
        console.error(err);
    }
}

function print_all_file_path_in_current_directory(dirPath, filePaths = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            print_all_file_path_in_current_directory(filePath, filePaths);
        } else {
            filePaths.push(filePath);
        }
    });

    return filePaths;
}

function see_pattern_in_this_string(str, regexRule) {
    let match;
    let functions = [];

    while ((match = regexRule.exec(str)) !== null) {
        functions.push(match[1]);
    }

    return functions;
}

function store_in_map(item, map) {
    if (map[item]) {
        map[item] += 1;
    } else {
        map[item] = 1;
    }
}

function write_map_in_sorted_form(map) {
    let entries = Object.entries(map);
    entries.sort((a, b) => b[1] - a[1]);
    console.log(entries);
}

// user input start
const projectPath = './';
const functionSyntaxRegex = /(\w+)\(/g
// user input end

const filePaths = print_all_file_path_in_current_directory(projectPath);
const map = {}

console.log('%cindex.js line:58 filePaths', 'color: #007acc;', filePaths);

filePaths.forEach(file => print_file_content_of_this_file(file, (single_line) => {
    let functions = see_pattern_in_this_string(single_line, functionSyntaxRegex);
    functions.map((item) => {
        store_in_map(item, map);
    })
}));

console.log('%cindex.js line:64 map', 'color: #007acc;', write_map_in_sorted_form(map));
