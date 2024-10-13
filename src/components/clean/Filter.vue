<template>
    <div>
        <input type="text" placeholder="Search for names.." v-model="filterTerm"
               @keyup="filter()">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Filter',
    props: [
        'tableId'
    ],

    data() {
        return {
            filterTerm: '',
            dataType: 'table',
        }
    },

    methods: {
        filter() {
            switch (this.dataType) {
                case 'table':
                    let td;
                    const table = document.getElementById(this.tableId);
                    const tr = table.getElementsByTagName('tr');

                    for (let i = 0; i < tr.length; i++) {
                        td = tr[i].getElementsByTagName('td')[0];
                        if (td) {
                            if (td.textContent.toUpperCase().indexOf(this.filterTerm.toUpperCase()) > -1) {
                                tr[i].style.display = '';
                            } else {
                                tr[i].style.display = 'none';
                            }
                        }
                    }
                    break;
                case 'list':
                    const list = document.getElementById(this.tableId);
                    const li = list.getElementsByTagName('li');

                    for (let i = 0; i < li.length; i++) {
                        if (li[i].textContent.toUpperCase().indexOf(this.filterTerm.toUpperCase()) > -1) {
                            li[i].style.display = '';
                        } else {
                            li[i].style.display = 'none';
                        }
                    }
                    break;
                default:
                    break;
            }
        },
    },

}

</script>
