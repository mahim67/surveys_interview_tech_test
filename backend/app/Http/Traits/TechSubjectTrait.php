<?php

namespace App\Http\Traits;

use App\Models\TechSubject;

trait TechSubjectTrait
{
    public function storeSubjectTrait($request)
    {
       return TechSubject::Create($this->parse_request($request));
    }

    private function parse_request($request)
    {
        $t_credit        = $request->sub_t_credit;
        $p_credit        = $request->sub_p_credit / 3;
        $total_credit    = $t_credit + $p_credit;
        $sub_total_marks = $request->sub_tc_marks + $request->sub_tf_marks + $request->sub_pc_marks + $request->sub_pf_marks;
        return [
            'sub_code'         => $request->sub_code,
            'sub_name'         => $request->sub_name,
            'sub_t_credit'     => $request->sub_t_credit,
            'sub_p_credit'     => $request->sub_p_credit,
            'sub_total_credit' => $total_credit,
            'sub_tc_marks'     => $request->sub_tc_marks,
            'sub_tf_marks'     => $request->sub_tf_marks,
            'sub_pc_marks'     => $request->sub_pc_marks,
            'sub_pf_marks'     => $request->sub_pf_marks,
            'sub_total_marks'  => $sub_total_marks,
            'sub_dept'         => $request->sub_dept,
            'sub_probidhan'    => $request->sub_probidhan,
            'sub_description'  => $request->sub_description ?? null,
        ];
    }
}
