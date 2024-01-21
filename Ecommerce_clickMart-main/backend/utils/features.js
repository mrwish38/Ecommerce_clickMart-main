class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

      this.query = this.query.find({...keyword});
      return this;
  }

  filter() {
    const queryCopy = {...this.queryStr};

    // Category Filter
    // Remove some fields for category
    const removeFields = ["keyword","page","limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Price Filter
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(productPerPage) {

    const currPage = Number(this.queryStr.page) || 1;
    const skipProducts = productPerPage*(currPage - 1);

    this.query = this.query.limit(productPerPage).skip(skipProducts);
    return this;
  }

}

module.exports = ApiFeatures;
