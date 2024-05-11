class ApiFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }
  search() {
    const keyword = this.querystr.keyword
      ? {
          $or: [
            { name: { $regex: this.querystr.keyword, $options: "i" } },
            { description: { $regex: this.querystr.keyword, $options: "i" } },
          ],
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const querycopy = { ...this.querystr };
    //removinf=g fields for category
    const removefields = ["keyword", "page", "limit"];
    removefields.forEach((e) => delete querycopy[e]);
    let queryStr = JSON.stringify(querycopy);
    queryStr = queryStr.replace(/\b(lt|gt|lte|gte)\b/g, (e) => `$${e}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resultperpage) {
    let currentpage = Number(this.querystr.page) || 1;
    const skip = resultperpage * (currentpage - 1);
    this.query = this.query.limit(resultperpage).skip(skip);
    return this;
  }
}
export default ApiFeatures;
