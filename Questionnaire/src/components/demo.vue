<template>
    <div>
        <Checkbox-group v-model="tableColumnsChecked" @on-change="changeTableColumns">
            <Checkbox label="show">Show</Checkbox>
        </Checkbox-group>
        <Table :data="tableData2" :columns="tableColumns2" border></Table>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                tableData2: this.mockTableData2(),
                tableColumns2: [],
                tableColumnsChecked: ['show']
            }
        },
        methods: {
            mockTableData2 () {
                let data = [];
                function getNum() {
                    // return Math.floor(Math.random () * 10000 + 1);
                }
                for (let i = 0; i < 10; i++) {
                    // data.push({
                    //     name: 'Name ' + (i+1),
                    //     fav: 0,
                    //     show: getNum()
                    // })
                }
                return data;
            },
            getTable2Columns () {
                const table2ColumnList = {
                    name: {
                        render: (h, params) => {
                            const fav = this.tableData2[params.index].fav;
                            const style = fav === 0 ? {
                                cursor: 'pointer'
                            } : {
                                cursor: 'pointer',
                                color: '#f50'
                            };

                            // return h('div', [
                            //     h('Icon', {
                            //         style: style,
                            //         props: {
                            //             type: fav === 0 ? 'ios-star-outline' : 'ios-star'
                            //         },
                            //         nativeOn: {
                            //             click: () => {
                            //                 this.toggleFav(params.index);
                            //             }
                            //         }
                            //     }),
                            //     h('span', ' ' + params.row.name)
                            // ]);
                        }
                    },
                    show: {
                        title: 'Show',
                        key: 'show',
                        width: 150,
                        sortable: true
                    }
                };

                let data = [table2ColumnList.name];

                this.tableColumnsChecked.forEach(col => data.push(table2ColumnList[col]));

                return data;
            },
            changeTableColumns () {
                this.tableColumns2 = this.getTable2Columns();
            },
            toggleFav (index) {
                this.tableData2[index].fav = this.tableData2[index].fav === 0 ? 1 : 0;
            }
        },
        mounted () {
            this.changeTableColumns();
        }
    }
</script>
