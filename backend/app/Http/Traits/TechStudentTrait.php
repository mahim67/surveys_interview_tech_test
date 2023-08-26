<?php

namespace App\Http\Traits;

use App\Models\TechSession;
use App\Models\TechStudent;
use App\Models\TechTechnology;

trait TechStudentTrait
{
    public function storeStudentTrait($request)
    {
       return TechStudent::Create($this->parse_request($request));
    }

    private function parse_request($request)
    {
        $department = TechTechnology::find($request->s_dept);
        $session = TechSession::find($request->s_session);
        $tech_dept_shift_sess_probidhan_student_count = TechStudent::where([
            's_session' => $request->s_session,
            's_shift' => $request->s_shift,
            's_probidhan' => $session->sec_probidhan,
            's_dept' => $request->s_dept,
        ])->count();
        $s_i_roll = $department->d_sort_name .$request->s_session.$request->s_shift.$session->sec_probidhan.$request->s_dept.++$tech_dept_shift_sess_probidhan_student_count;
        $s_password = rand(111111,999999);
        return [
            's_name'=>$request->s_name??null,
            's_i_roll'=>$s_i_roll??null,
            's_board_roll'=>$request->s_board_roll??null,
            's_board_reg_no'=>$request->s_board_reg_no??null,
            's_session'=>$request->s_session??null,
            's_shift'=>$request->s_shift??null,
            's_probidhan'=>$session->sec_probidhan??null,
            's_dept'=>$request->s_dept??null,
            's_sem'=>$request->s_sem??null,
            's_section'=>$request->s_section??null,
            's_admission_date'=> isset($request->s_admission_date)?parse_date_store_db($request->s_admission_date):null,
            's_contact_no'=>$request->s_contact_no??null,
            's_father'=>$request->f_name??null,
            's_mother'=>$request->m_name??null,
            's_gender'=>$request->s_gender??null,
            's_type'=>$request->s_type??null,
            's_image'=>$request->s_image??null,
            's_picture'=>$request->s_picture??null,
            's_password'=>$s_password??null
        ];
    }
}
