<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <div>
             <h1>Dashboard</h1>
             <div class="row">
                 <div class="col-md-3">
                     <div class="card">
                         <div class="card-body">
                             <h5 class="card-title">New Visits</h5>
                             <p class="card-text">102,400</p>
                         </div>
                     </div>
                 </div>
                 <div class="col-md-3">
                     <div class="card">
                         <div class="card-body">
                             <h5 class="card-title">Messages</h5>
                             <p class="card-text">81,212</p>
                         </div>
                     </div>
                 </div>
                 <div class="col-md-3">
                     <div class="card">
                         <div class="card-body">
                             <h5 class="card-title">Purchases</h5>
                             <p class="card-text">9,280</p>
                         </div>
                     </div>
                 </div>
                 <div class="col-md-3">
                     <div class="card">
                         <div class="card-body">
                             <h5 class="card-title">Shoppings</h5>
                             <p class="card-text">13,600</p>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
</template>
<script>
     export default {
         name: 'Dashboard',
     };
</script>
