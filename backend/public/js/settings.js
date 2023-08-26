var sendHttpRequest = (method, url, data = null) => {
    let headers = null;
    headers = {
        "X-CSRF-TOKEN": csrf_token,
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    return fetch(url, {
        method: method,
        body: data ? JSON.stringify(data) : null,
        headers: headers,
    }).then((response) => {
        if (response.status >= 400) {
            return response.json().then((errResData) => {
                var error = new Error("Something went wrong!");
                error.data = errResData;
                throw error;
            });
        }
        return response.json();
    });
};

function MAKE_TABLE(
    heading_property,
    data,
    actions_property,
    start = null,
    deleteStuff =null,

) {
    var deleteMethod = null;
    var deleteidentifier = null;
    if(deleteStuff){
        deleteMethod = deleteStuff['method'];
        deleteidentifier = deleteStuff['identifier'];
    }
    let htmlOutput = "";
    //body
    let count = 1;
    for (let element in data) {
        htmlOutput += `<tr>`;
        for (let key in heading_property) {
            if (key == "iteration") {
                    htmlOutput += !start
                        ? `<td>${count++}</td>`
                        : `<td>${start++}</td>`;
                
            } else if (key == "action") {
                htmlOutput += `<td>`;
                for (let each_action in actions_property) {
                    if (each_action == "show") {
                        htmlOutput += `<a title="Details" style='cursor:pointer' class="btn bg-info"
            href="${actions_property[each_action].replace(
                "replaceable",
                data[element]["id"]
            )}">
            <i class="fas fa-eye"></i>
            </a>`;
                    }
               
                    if (each_action == "edit") {
                        if (!data[element]["is_tender_floated"]) {
                            htmlOutput += `<a title="Show" class="btn btn-outline bg-primary btn-icon text-primary btn-sm border-primary border-2 rounded-round legitRipple mr-1"
            href="${actions_property[each_action].replace(
                "replaceable",
                data[element]["id"]
            )}">
            <i class="fas fa-pen"></i>
            </a>`;
                        }
                    }
                    if (each_action == "delete") {
                        htmlOutput += `<a title="Delete" style='cursor:pointer' class="btn bg-danger"
             data-hit_url='${actions_property[each_action].replace(
                 "replaceable",
                 data[element]["id"]
             )}' onclick="${deleteMethod}(${data[element][deleteidentifier]})">
            <i class="fas fa-trash"></i>
            </a>`;
                    }
                }
                htmlOutput += `</td>`;
            } else {
                htmlOutput += `<td>
        ${
            data[element][key] && data[element][key].length > 25
                ? data[element][key].substring(0, 25) + `...`
                : data[element][key]
                ? data[element][key]
                : ""
        }
        </td>`;
            }
        }
        htmlOutput += `</tr>`;
    }
    //If no data is there;
    if (Object.keys(data).length == 0) {
        let colspan = Object.keys(heading_property).length;
        htmlOutput += `<tr>`;
        htmlOutput += `<td class='text-center' colspan='${colspan}'>No Record Found</td>`;
        htmlOutput += `</tr>`;
    }
    return htmlOutput;
}


const DEFAULT_PAGINATE_ITEM = 5;
const DEFAULT_PAGINATE_ITEM_START_CAL = DEFAULT_PAGINATE_ITEM - 1;
