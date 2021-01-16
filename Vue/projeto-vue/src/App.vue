<template>
    <div id="app">
        <h1>Estudando Vue</h1>
        <h3>Cadastro</h3>
        <small v-if="deuErro">O nome é inválido</small><br>
        <input type="text" placeholder="Nome" v-model="nomeField" /><br />
        <input
            type="text"
            placeholder="Descrição"
            v-model="descricaoField"
        /><br />
        <input type="number" placeholder="Idade" v-model="idadeField" /><br />
        <input
            type="email"
            placeholder="Email"
            name=""
            id=""
            v-model="emailField"
        /><br />
        <button @click="cadastrarUsuario">Cadastrar</button>
        <hr />
        <div v-for="(cliente, index) in this.orderClientes" :key="cliente.id">
            <h1>{{ index + 1 }}</h1>
            <Cliente :cliente="cliente" @meDelete="deletarUsuario($event)"/>
            <hr />
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import Cliente from "./components/Cliente";


export default {
    name: "App",
    data() {
        return {
            deuErro: false,
            nomeField: "",
            emailField: "",
            idadeField: "",
            descricaoField: "",
            clientes: [
                {
                    id: 1,
                    nome: "avio",
                    idade: 20,
                    descricao: "É uma descrição!",
                    email: "saviomendesmirana@gmail.com",
                },
                {
                    id: 2,
                    nome: "Savio 2",
                    idade: 20,
                    descricao: "É uma descrição!",
                    email: "saviomendesmirana@gmail.com",
                },
                {
                    id: 3,
                    nome: "Savio 3",
                    idade: 20,
                    descricao: "É uma descrição!",
                    email: "saviomendesmirana@gmail.com",
                },
            ],
        };
    },
    components: {
        Cliente,
    },
    methods: {
        cadastrarUsuario: function () {
            if (this.nomeField == "" || !this.nomeField.length) {
                this.deuErro = true
            } else {
                this.clientes.push({
                    nome: this.nomeField,
                    email: this.emailField,
                    idade: this.idadeField,
                    descricao: this.descricaoField,
                    id: Date.now(),
                });
                this.nomeField = "";
                this.idadeField = "";
                this.descricaoField = "";
                this.emailField = "";
                this.deuErro = false
            }
        },
        deletarUsuario: function($event){
            console.log($event)
            this.clientes = this.clientes.filter(cliente => cliente.id != $event.id)
        }
    },
    computed: {
        orderClientes: function(){
            return _.orderBy(this.clientes, ['nome'], ['desc'])
        }
    }
};
</script>
