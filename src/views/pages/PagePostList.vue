<template>
    <div class="container">
        <div class="row">
                <table id="posts">
                    <thead>
                        <tr>
                            <th>Title</th>
                        </tr>
                    </thead>
                </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import dt from 'datatables.net';

console.log(dt)

    export default {
        name: 'PagePostList',
        data() {
           return {
             posts: []
           }
        },
        mounted() {
           const app = this;
           axios.get('http://localhost:3000/api/posts').then(response => {
               app.showPosts(response.data);
           });
        },
        methods: {
            showPosts(diets) {
                console.log(diets, diets.length)
                $('#posts').DataTable({
                    data: diets,
                    mark: true,
                    responsive: true,
                    // language: {
                    //     processing: "Подождите...",
                    //     search: "Поиск:",
                    //     lengthMenu: "Показать _MENU_ записей",
                    //     info: "Записи с _START_ до _END_ из _TOTAL_ записей",
                    //     infoEmpty: "Записи с 0 до 0 из 0 записей",
                    //     infoFiltered: "(отфильтровано из _MAX_ записей)",
                    //     infoPostFix: "",
                    //     loadingRecords: "Загрузка записей...",
                    //     zeroRecords: "Записи отсутствуют.",
                    //     emptyTable: "В таблице отсутствуют данные",
                    //     paginate: {
                    //         first: "Первая",
                    //         previous: "Предыдущая",
                    //         next: "Следующая",
                    //         last: "Последняя"
                    //     },
                    //     aria: {
                    //         sortAscending: ": активировать для сортировки столбца по возрастанию",
                    //         sortDescending: ": активировать для сортировки столбца по убыванию"
                    //     },
                    //     select: {
                    //         rows: {
                    //             "_": "Выбрано записей: %d",
                    //             "0": "Кликните по записи для выбора",
                    //             "1": "Выбрана одна запись"
                    //         }
                    //     }
                    // },
                    order: [[0, "asc"]],
                    columns: [
                        {
                            data: 'title',
                            className: 'dt-body-justify',
                            render: function (data, type, row) {
                                const postId = row._id;
                                return `<a href='#/posts/${postId}'><i class="fa fa-edit fa-lg"></i>${row.title}</a>`;
                            }
                        }
                    ]
                });
            }
        }
    }
</script>
