<template>
  <div class="posts">
    <h1>Posts</h1>
    <div v-if="posts" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewPost' }" class="">Add Post</router-link>
      </div>

        Gitcoin Issues
        <div v-for="post in posts" v-bind:key="post._id">
          {{post.title}}
          {{post.description}}
          {{post.votes}}

          <br>
          <!-- #{{ post.data.id }}
          <span v-for="tag in post.data.tags" v-bind:key="tag.id">
            {{tag.name}}
          </span>
          {{post}}
          {{ post.data.created_on }}
          {{ post.data.comments }}
          {{ post.data.title }}
          {{ post.total_votes }}
          {{ post.description }} -->
        </div>
    </div>
    <div v-else>
      There are no posts.. Lets add one now <br /><br />
      <router-link v-bind:to="{ name: 'NewPost' }" class="add_post_link">Add Post</router-link>
    </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const vm = this
      const response = await PostsService.fetchPosts()
      console.log(response.data)
      vm.posts = response.data.posts
    }
  }
}
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
