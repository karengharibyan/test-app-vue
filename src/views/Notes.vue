<template>
  <div class="notes-container">
    <v-pagination v-model="page" :length="totalPages" />
    <AddNoteModal :afterSave="fetchData" />
    <v-row align="center" justify="center">
      <v-radio-group v-model="ownNotes" :mandatory="false" row>
        <v-radio label="All Notes" :value="false"></v-radio>
        <v-radio label="My Notes" :value="true"></v-radio>
      </v-radio-group>
    </v-row>
      <v-container class="fill-height" fluid>
        <div class="notes">
          <v-card
            v-for="note in notes"
            :key="note.id"
            class="mx-auto"
            :img="note.image ? getNoteImageUrl(note.image) : null"
            color="#26c6da"
            dark
            width="100%"
          >
            <div class="card-content">
              <v-card-title class="justify-center">
                <h3 class="title font-weight-bold">{{ note.title }}</h3>
              </v-card-title>

              <v-card-text class="headline font-weight-light">
                {{ note.text }}
              </v-card-text>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-list-item-avatar color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      :src="getUserAvatarUrl(note.user.avatar)"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      `${note.user.first_name} ${note.user.last_name}`
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-card-actions>
            </div>
          </v-card>
        </div>
      </v-container>
    <v-pagination v-model="page" :length="totalPages" />
  </div>
</template>

<script>
import AddNoteModal from '@/components/notes/AddNoteModal'
export default {
  name: "Notes",
  data() {
    return {
      page: 1,
      notes: [],
      totalPages: 1,
      ownNotes: false,
    };
  },
  components: {
      AddNoteModal
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
    getNoteImageUrl(image) {
      return `${process.env.VUE_APP_IMAGES_URL}/notes/${image}`;
    },
    getUserAvatarUrl(image) {
      if (image) {
        return `${process.env.VUE_APP_IMAGES_URL}/users/${image}`;
      }
      return "https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg";
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
    .card-content {
      background-color: rgba(0, 0, 0, 0.5);
      height: 100%;
    }
  }
}
</style>