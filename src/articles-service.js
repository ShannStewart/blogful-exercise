const articlesService = {
  serviceCheck(){
    console.log("GET ITS ME")
  },  
  getAllArticles(knex) {
    return knex
      .select('*')
      .from('blogful_articles');
  },
  getById(knex, id) {
    return knex
     .from('blogful_articles')
     .select('*')
     .where('id', id)
     .first();
  },
  deleteItem(knex, id) {
    return knex('blogful_articles')
      .where({ id })
      .delete();
  },
  updateArticle(knex, id, newItemFields) {
    return knex('blogful_articles')
      .where({ id })
      .update(newItemFields);
  },
  insertArticle(knex, newItem) {
    return knex
      .insert(newItem)
      .into('blogful_articles')
      .returning('*')
      .then(rows => rows[0]);
  },
};


  module.exports = articlesService;