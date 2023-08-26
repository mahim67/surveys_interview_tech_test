<?php

use Carbon\Carbon;

const DEFAULT_PAGINATE_ITEM = 5;
const DEFAULT_PAGINATE_ITEM_START_CAL = DEFAULT_PAGINATE_ITEM - 1;


function error_response($message = null, $data = [])
{
    return response()->json(array_merge([
        'status' => 'error',
        'message' => isset($message) ? $message : 'error occured'
    ], isset($data) ? ['data' => $data] : []));
}
function success_response($message = null, $data = [])
{
    return response()->json(array_merge([
        'status' => 'ok',
        'message' => isset($message) ? $message : 'successfull'
    ], isset($data) ? ['data' => $data] : []));
}

function parse_date_store_db($date){
    return Carbon::parse($date)->format('Y-m-d');
}
