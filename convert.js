import heic2any from "./node_modules/heic2any/dist/heic2any.js";

console.log("Loading success");

export function convert() {

    // alert("Start converting");
    console.log("Start converting");

    const para_rate = parseFloat(document.getElementById("rate").value);
    const para_format = document.getElementById("file_format").value;
    const para_files_list = document.getElementById("files").files;

    for (let i = 0; i < para_files_list.length; i++) {
        const para_file = para_files_list[i].name;
        const file_name = get_file_name(para_file);
        const file_type = get_file_type(para_format);

        const conversionResult =  heic2any({
            blob: para_files_list[i],
            toType: para_format,
            quality : para_rate
        });
        conversionResult
            .then((conversionResult) => {
                let a = document.createElement("a");
                a.href = URL.createObjectURL(conversionResult);
                a.download = file_name + "." + file_type;
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                URL.revokeObjectURL(a.href); // 释放URL 对象
                a.remove();
            }).catch((e) => {
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