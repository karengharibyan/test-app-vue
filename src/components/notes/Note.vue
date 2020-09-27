<template>
  <v-card
    class="mx-auto"
    :img="note.image ? getNoteImageUrl(note.image) : null"
    color="#26c6da"
    dark
    width="100%"
  >
    <div class="card-content">
      <v-card-title class="justify-center">
        <h3 class="title font-weight-bold text-center">{{ note.title }}</h3>
      </v-card-title>

      <v-card-text class="headline font-weight-light text-center">
        {{ note.text }}
      </v-card-text>

      <v-card-actions>
        <v-row align="center" justify="center">
          <v-col v-if="$auth.user().id != note.user.id">
            <div class="ma-2 d-flex justify-center">
              <v-avatar width="50" height="50">
                <v-img
                  class="elevation-6"
                  :src="getUserAvatarUrl(note.user.avatar)"
                ></v-img>
              </v-avatar>
            </div>
            <div class="ma-2 text-center">
              <h4>
                {{ `${note.user.first_name} ${note.user.last_name}` }}
              </h4>
            </div>
          </v-col>
          <div v-else>
            <v-btn
              color="blue-grey"
              class="ma-2 white--text"
              @click="openEditDialog(note)"
            >
              Edit
              <v-icon right dark> mdi-pencil </v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Note",
  props: ["note","openEditDialog"],
  methods: {
    getNoteImageUrl(image) {
      return `${process.env.VUE_APP_IMAGES_URL}/notes/${image}`;
    },
    getUserAvatarUrl(image) {
      if (image) {
        return `${process.env.VUE_APP_IMAGES_URL}/users/${image}`;
      }
      return "https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg";
    },
  },
};
</script>

<style lang="scss" scoped>
.card-content {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>