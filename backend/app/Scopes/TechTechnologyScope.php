<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class TechTechnologyScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        $authUser = auth()->user();
        if ($authUser->is_super_admin()) return true;
        if (isset($authUser->a_dept) && ($authUser->a_dept) && !empty($authUser->department)) {
            $builder->where('d_status', '=', 1)->where('d_department', $authUser->department->tech_id);
        } elseif (isset($authUser->a_dept)) {
            $builder->where('d_status', '=', 1)->where('d_department', $authUser->a_dept);
        } else {
            $builder->where('d_status', '=', 1)->where('d_department', -99999);
        }
    }
}
