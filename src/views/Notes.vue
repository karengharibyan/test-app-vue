<template>
  <div class="notes-container">
    <v-pagination v-model="page" :length="totalPages" />
    <AddNoteModal ref="note_modal" :afterSave="fetchData" :note="editNote" />
    <v-row align="center" justify="center">
      <v-radio-group v-model="ownNotes" :mandatory="false" row>
        <v-radio label="All Notes" :value="false"></v-radio>
        <v-radio label="My Notes" :value="true"></v-radio>
      </v-radio-group>
    </v-row>
    <v-container class="fill-height" fluid>
      <div class="notes">
        <Note v-for="note in notes" :key="note.id" :note="note" :openEditDialog="openEditDialog" />
      </div>
    </v-container>
    <v-pagination v-model="page" :length="totalPages" />
  </div>
</template>

<script>
import AddNoteModal from "@/components/notes/AddNoteModal";
import Note from '@/components/notes/Note'
export default {
  name: "Notes",
  data() {
    return {
      page: 1,
      notes: [],
      totalPages: 1,
      ownNotes: false,
      editModal: false,
      editNote: null
    };
  },
  components: {
    AddNoteModal,
    Note
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    page: function () {
      this.fetchData();
    },
    ownNotes: function () {
      this.page = 1;
      this.fetchData();
    },
  },
  methods: {
    fetchData() {
      this.$http
        .get("notes", {
          params: {
            page: this.page,
            own: this.ownNotes,
            limit: 10,
          },
        })
        .then(({ data }) => {
          this.totalPages = data.last_page;
          this.notes = data.data;
        });
    },
    
    openEditDialog(note){
      this.editNote = note
      this.$refs.note_modal.dialog = true
    }
  },
};
</script>

<style lang="scss" scoped>
.notes-container {
  margin: 20px 0;
  .notes {
    display: grid;
    margin: 25px 0;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-gap: 25px;
   
  }
}
</style>