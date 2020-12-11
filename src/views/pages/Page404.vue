<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="clearfix">
                <h1 class="float-left display-3 mr-4">404</h1>
                <h4 class="pt-3">¯\_(ツ)_/¯</h4>
                <p class="text-muted">
                    Couldn't open the page <span class="text-primary" v-cloak>{{$route.params.path || $route.fullPath}}</span>
                </p>
                <p class="text-muted">
                    Probably, the page is removed, moved or not existed yet.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Page404'
    }
</script>
