<template>
    <div v-if="openAlert === true" class="alert relative" role="alert" :class="[color !== '' ? alertClasses : '']">
        <button v-if="showCloseButton === true" @click="hideAlert()" class="close-button topright">
            <font-awesome-icon :icon="['fas', 'times']"/>
        </button>

        <div class="h5 bold text-black">
            <i class="fa-solid fa-circle-exclamation margin-right-0-5" :class="color !== '' ? alertIcons : ''"></i>
            {{ heading }}
        </div>
        <p class="alert-message">
            <slot></slot>
        </p>

    </div>
</template>

<script>
export default {
    name: 'Alert',
    props: [
        'showCloseButton',
        'open',
        'color',
        'heading'
    ],

    data() {
        return {
            openAlert: true,
        }
    },

    mounted() {
        this.openAlert = true;
    },

    methods: {
        showAlert() {
            this.openAlert = true;
        },

        hideAlert() {
            this.openAlert = false;
        }
    },

    computed: {
        alertClasses() {
            switch (this.$props.color) {
                case 'danger':
                    return 'danger';
                case 'warning':
                    return 'warning';
                case 'success':
                    return 'success';
                case 'info':
                    return 'info';
                default:
                    return 'info';
            }
        },

        alertIcons() {
            switch (this.$props.color) {
                case 'danger':
                    return 'fa-circle-exclamation';
                case 'warning':
                    return 'fa-triangle-exclamation';
                case 'success':
                    return 'fa-circle-check';
                case 'info':
                    return 'fa-circle-info';
                default:
                    return 'fa-circle-info';
            }
        }
    }
}

</script>
