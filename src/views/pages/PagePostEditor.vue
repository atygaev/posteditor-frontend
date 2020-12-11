<template>
    <div class="container">
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">You can return <a href="#/posts">back</a> or <button type="button" class="btn btn-primary" v-on:click="save">save</button> the post.</h5>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{title}}</h5>
                    <p class="card-text">


                        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor> 



                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    export default {
        name: 'PagePostEditor',
        data() {
            return {
                title: String,
                article: String,
                editor: ClassicEditor,
                editorData: '',
                editorConfig: {
                }
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
                this.editorData = post.article;
            },
            save: function() {
           const app = this;
                console.log('sdsd')
                const postId = this.$route.params.postId;
                axios({
                    method: 'PUT',
                    url: `http://localhost:3000/api/posts/${postId}`,
                    data: {
                        article: app.editorData
                    }
                }).then(response => {
                    console.log(response);
                });
            }
        },
        computed: {
            editorLink: function() {
                return this.$route.params.postId + '/editor';
            }
        }
    }
</script>
