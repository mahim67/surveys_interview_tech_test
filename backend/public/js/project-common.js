function getTechnologyByProbidhan(
    input,
    selected_id = null,
    destinationSelector
) {
    let tech_list = document.querySelector(`${destinationSelector}`);
    let uri = `${application_api_url}/get-technology-by-probidhan-id/${input.value}`;
    let option = "";
    option += "<option value=''>SELECT TECHNOLOGY</option>";
    tech_list.innerHTML = option;
    if (!input.value) return;
    sendHttpRequest("POST", uri)
        .then((responseData) => {
            if (responseData.status && responseData.status == "ok") {
                option = "";
                tech_list.innerHTML = "";
                let { data: technology } = responseData;
                option += "<option value=''>SELECT TECHNOLOGY</option>";
                technology.forEach((element) => {
                    if (selected_id && selected_id == element["d_id"]) {
                        option +=
                            "<option selected value='" +
                            element["d_id"] +
                            "'>" +
                            element["d_name"] +
                            " (" +
                            element["d_code"] +
                            ") " +
                            "</option>";
                    } else {
                        option +=
                            "<option value='" +
                            element["d_id"] +
                            "'>" +
                            element["d_name"] +
                            " (" +
                            element["d_code"] +
                            ") " +
                            "</option>";
                    }
                });
                tech_list.innerHTML = option;
            }
        })
        .catch((e) => console.log(e));
}

function getTechnologyBySession(
    input,
    selected_id = null,
    destination_identifier
) {
    let tech_list = document.querySelector(`${destination_identifier}`);
    let uri = `${application_api_url}/get-technology-by-session/${input.value}`;
    let option = "";
    option += "<option value=''>SELECT TECHNOLOGY</option>";
    tech_list.innerHTML = option;
    if (!input.value) return;
    sendHttpRequest("POST", uri)
        .then((responseData) => {
            if (responseData.status && responseData.status == "ok") {
                option = "";
                tech_list.innerHTML = "";
                let { data: technology } = responseData;
                option += "<option value=''>SELECT TECHNOLOGY</option>";
                technology.forEach((element) => {
                    if (selected_id && selected_id == element["d_id"]) {
                        option +=
                            "<option selected value='" +
                            element["d_id"] +
                            "'>" +
                            element["d_name"] +
                            " (" +
                            element["d_code"] +
                            ") " +
                            "</option>";
                    } else {
                        option +=
                            "<option value='" +
                            element["d_id"] +
                            "'>" +
                            element["d_name"] +
                            " (" +
                            element["d_code"] +
                            ") " +
                            "</option>";
                    }
                });
                tech_list.innerHTML = option;
            }
        })
        .catch((e) => console.log(e));
}
