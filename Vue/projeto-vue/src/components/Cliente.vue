<template>
    <div :class="{ cliente: !isPremium, 'cliente-premium': isPremium }">
        <h4>Nome: {{ cliente.nome }}</h4>
        <hr />
        <p>{{ cliente.descricao }}</p>
        <hr />
        <p>Email: {{ processarEmail(cliente.email) }}</p>
        <p>Idade: {{ cliente.idade }}</p>
        <button class="btn btn-success" @click="mudarCor">Mudar cor!</button>
        <button class="btn btn-danger" @click="emitirEventoDelete">Deletar</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isPremium: false,
        };
    },
    props: {
        cliente: Object,
        showAge: Boolean,
    },
    methods: {
        mudarCor: function () {
            //NAO OPDE SER ARROW (?)
            this.isPremium = !this.isPremium;
        },
        emitirEventoDelete: function(){
            this.$emit('meDelete', {id: this.cliente.id, component: this})
        },
        processarEmail: function (value) {
            return value.toUpperCase()
        }
    },
    computed: {
        idEspecial: function(){
            return (this.cliente.email + this.cliente.nome + this.cliente.idade).toUpperCse()
        }
    }
};
</script>

<style scoped>
.cliente {
    background-color: #eee;
    padding: 1%;
    margin-top: 2%;
}

.cliente-premium {
    background-color: #aaa;
    padding: 1%;
    margin-top: 2%;
}
</style>