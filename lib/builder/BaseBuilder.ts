export default class BaseBuilder<A = { [key: string]: unknown }> {
  with(attrs: Partial<A>) {
    Object.assign(this, attrs);
    return this;
  }
}
