<template>
<div class="message-container">
    <Icon class="icon-success"  icon="material-symbols:done" />
    <p> {{ msg }} </p>
</div>
</template>

<script>
import { Icon } from '@iconify/vue';
export default {
    name: "MessageSuccess",
    props: {
        msg: String 
    },
    components: {
        Icon,
    },

}
</script>
<style scoped>
    .message-container {    
        display: flex;
        position: absolute;
        top: 8rem;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #0da602;
        background-color: #d0ffca;
        border: 2px #02a641 solid;
        border-radius: 5px;
        padding: 8px;
        max-width: 400px;
        text-align: center;
        transition: 3s;
        align-items: center;
    }
    .icon-success{
        margin-right: 5px;
        width: 3rem;
        height: 3rem;
    }
       
   


</style>