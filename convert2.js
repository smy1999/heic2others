import heic2any from "./node_modules/heic2any/dist/heic2any.js";

console.log("12312")

export function convert() {

    console.log("456")

    const para_rate = parseFloat(document.getElementById("rate").value);
    const para_format = document.getElementById("file_format").value;
    const para_files_list = document.getElementById("files").files;
    const para_path = document.getElementById("path").value;
    console.log(para_files_list);

    console.log(para_rate);
    console.log(para_format);
    console.log("789");

    for (let i = 0; i < para_files_list.length; i++) {
        const para_file = para_files_list[i].name;
        // const para_path = "./" + para_file;
        const file_name = get_file_name(para_file);
        const file_type = get_file_type(para_format);
        // console.log(file_name + " + " + file_type);

        // fetch(para_path)
        let file_full_path;
        if (para_path[para_path.length - 1] != '/')
           file_full_path = para_path + "/" + para_file
        else
            file_full_path = para_path + para_file
        console.log("parafile: " + file_full_path);

        const input_blob = URL.createObjectURL(para_files_list[i]);
        // return url;
        console.log(input_blob);
        const conversionResult =  heic2any({
                        // blob: input_blob,
                        blob: para_files_list[i],
                        toType: para_format,
                        quality : para_rate
                    });
        console.log(conversionResult);
        const conversionResultBlob = Promise.resolve("conversionResult");
        conversionResult
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
            });






        // let a = document.createElement("a");
        // a.href = URL.createObjectURL(conversionResultBlob);
        // a.download = file_name + "." + file_type;
        // a.style.display = "none";
        // document.body.appendChild(a);
        // a.click();
        // URL.revokeObjectURL(a.href); // 释放URL 对象
        // a.remove();
        //
        //
        //
        // fetch(file_full_path)
        //     .then((res) => res.blob())
        //     .then((blob) =>
        //         heic2any({
        //             blob,
        //             toType: para_format,
        //             quality : para_rate
        //         })
        //     )
        //     .then((conversionResult) => {
        //         // conversionResult is a BLOB
        //         // of the PNG formatted image
        //         let a = document.createElement("a");
        //         a.href = URL.createObjectURL(conversionResult);
        //         a.download = file_name + "." + file_type;
        //         a.style.display = "none";
        //         document.body.appendChild(a);
        //         a.click();
        //         URL.revokeObjectURL(a.href); // 释放URL 对象
        //         a.remove();
        //     })
        //     .catch((e) => {
        //         // see error handling section
        //         console.log(e);
        //     });
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