import heic2any from "./node_modules/heic2any/dist/heic2any.js";

console.log("12312")

export function convert() {

    console.log("456")

    const para_rate = parseFloat(document.getElementById("rate").value);
    const para_format = document.getElementById("file_format").value;
    const para_files_list = document.getElementById("files").files;
    console.log(para_files_list);

    console.log(para_rate);
    console.log(para_format);
    console.log("789");

    for (let i = 0; i < para_files_list.length; i++) {
        const para_file = para_files_list[i].name;
        const para_path = "./" + para_file;
        const file_name = get_file_name(para_file);
        const file_type = get_file_type(para_format);
        // console.log(file_name + " + " + file_type);

        // fetch(para_path)
        fetch(para_files_list[i])
            .then((res) => res.blob())
            .then((blob) =>
                heic2any({
                    blob,
                    toType: para_format,
                    quality : para_rate
                })
            )
            .then((conversionResult) => {
                // conversionResult is a BLOB
                // of the PNG formatted image
                let a = document.createElement("a");
                a.href = URL.createObjectURL(conversionResult);
                a.download = file_name + "." + file_type;
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(a.href); // 释放URL 对象
                a.remove();
            })
            .catch((e) => {
                // see error handling section
                console.log(e);
            });
    }
}

function get_file_name(name_and_type) {
    const splits = name_and_type.split(".");
    const names = splits.slice(0, splits.length - 1);
    const file_name = names.join(".");
    return file_name;
}

function get_file_type(para_type) {
    const splits = para_type.split("/");
    return splits[splits.length - 1];
}