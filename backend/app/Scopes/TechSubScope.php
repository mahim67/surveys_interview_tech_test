<?php

namespace App\Scopes;

use App\Models\TechTechnology;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class TechSubScope implements Scope
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
            $all_technology_ids = TechTechnology::where('d_department', $authUser->department->tech_id)->pluck('d_id')->toArray();
            $builder->whereIn('sub_dept', $all_technology_ids);
        } else {
            $builder->where('sub_dept', -99999);
        }
    }
}
