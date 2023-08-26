<?php

namespace App\Policies;

use App\Models\TechAdmin;
use App\Models\TechMarkSheet;
use Illuminate\Auth\Access\HandlesAuthorization;

class TechMarkSheetPolicy
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
     * @param  \App\Models\TechMarkSheet  $techMarkSheet
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(TechAdmin $techAdmin, TechMarkSheet $techMarkSheet)
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
     * @param  \App\Models\TechMarkSheet  $techMarkSheet
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(TechAdmin $techAdmin, TechMarkSheet $techMarkSheet)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\TechAdmin  $techAdmin
     * @param  \App\Models\TechMarkSheet  $techMarkSheet
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(TechAdmin $techAdmin, TechMarkSheet $techMarkSheet)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\TechAdmin  $techAdmin
     * @param  \App\Models\TechMarkSheet  $techMarkSheet
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(TechAdmin $techAdmin, TechMarkSheet $techMarkSheet)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\TechAdmin  $techAdmin
     * @param  \App\Models\TechMarkSheet  $techMarkSheet
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(TechAdmin $techAdmin, TechMarkSheet $techMarkSheet)
    {
        //
    }
}
