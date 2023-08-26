<?php

namespace App\Policies;

use App\Models\TechAdmin;
use App\Models\TechStudent;
use Illuminate\Auth\Access\HandlesAuthorization;

class TechStudentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\TechAdmin  $techAdmin
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(TechAdmin $techAdmin)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\TechAdmin  $techAdmin
     * @param  \App\Models\TechStudent  $techStudent
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(TechAdmin $techAdmin, TechStudent $techStudent)
    {
        //
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\TechAdmin  $techAdmin
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(TechAdmin $techAdmin)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\TechAdmin  $techAdmin
     * @param  \App\Models\TechStudent  $techStudent
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(TechAdmin $techAdmin, TechStudent $techStudent)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\TechAdmin  $techAdmin
     * @param  \App\Models\TechStudent  $techStudent
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(TechAdmin $techAdmin, TechStudent $techStudent)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\TechAdmin  $techAdmin
     * @param  \App\Models\TechStudent  $techStudent
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(TechAdmin $techAdmin, TechStudent $techStudent)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\TechAdmin  $techAdmin
     * @param  \App\Models\TechStudent  $techStudent
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(TechAdmin $techAdmin, TechStudent $techStudent)
    {
        //
    }
}
