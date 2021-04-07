<template>
  <CardEditor v-model="title" @closed="closed" @saved="addCard"></CardEditor>
</template>

<script>
import CardAddMutation from "./../graphql/CardAdd.gql";
import { EVENT_CARD_ADDED } from "../constents.js";
import CardEditor from "./CardEditor";

export default {
  components: { CardEditor },
  props: { list: Object },
  data() {
    return {
      title: null,
    };
  },
  methods: {
    addCard() {
      const self = this;

      this.$apollo.mutate({
        mutation: CardAddMutation,
        variables: {
          title: this.title,
          listId: this.list.id,
          order: this.list.cards.length + 1,
        },
        update(store, { data: { cardAdd } }) {
          self.$emit("added", {
            store,
            data: cardAdd,
            type: EVENT_CARD_ADDED,
          });

          self.closed();
        },
      });
    },
    closed() {
      this.$emit("closed");
    },
  },
};
</script>
