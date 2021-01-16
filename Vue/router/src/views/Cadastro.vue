<template>
    <div>
        <input type="text" name="email" id="email" placeholder="Email"><br>
        <input type="text" name="nome" id="nome" placeholder="Nome"><br>
        <button>Teste!</button>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    created(){
        //this.parametroDaRota = this.$route.params.dado
    },
    data(){
        return {
            parametroDaRota: ''
        }
    }
}
</script>