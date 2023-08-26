<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class TechDepartmentScope implements Scope
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
        if (isset($authUser->a_dept) && ($authUser->a_dept)) {
            $builder->where('tech_status', '=', 1)->where('tech_id', $authUser->a_dept);
        } elseif (isset($authUser->a_dept)) {
            $builder->where('tech_status', '=', 1)->where('tech_id', $authUser->a_dept);
        } else {
            $builder->where('tech_status', '=', 1)->where('tech_id', -99999);
        }
    }
}
