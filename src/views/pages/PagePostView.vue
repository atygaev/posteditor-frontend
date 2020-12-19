<template>
    <div class="container-fluid">

        <div class="row">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">You can return <a href="#/posts">back</a> or <a :href="editorLink">edit</a> the post.</h5>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{title}}</h5>
                    <div class="card-text col-md-12" v-html="article"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'PagePostView',
        data() {
            return {
                title: String,
                article: String
            }
        },
        mounted() {
           const app = this;
           const postId = this.$route.params.postId;
           axios.get(`http://localhost:3000/api/posts/${postId}`).then(response => {
               app.showPost(response.data);
           });
        },
        methods: {
            showPost(post) {
                this.title = post.title;
                this.article = post.article;
            }
        },
        computed: {
            editorLink: function() {
                return '#/posts/' + this.$route.params.postId + '/editor';
            }
        }
    }
</script>


<style>
.image-style-align-right {
    float: right;
    clear: both;
}
.image-style-align-left {
    float: left;
    clear: both;
}
</style>
