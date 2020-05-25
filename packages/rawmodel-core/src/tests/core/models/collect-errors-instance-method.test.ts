import { Spec } from '@hayspec/spec';
import { Model, prop } from '../../..';

const spec = new Spec();

spec.test('returns an array of errors', (ctx) => {
  class Book extends Model {
    @prop()
    public title: string;
  }
  class User extends Model {
    @prop()
    public name: string;
    @prop({
      parser: { resolver: Book },
    })
    public book: Book;
    @prop({
      parser: { array: true, resolver: Book },
    })
    public books: Book[];
  }
  const user = new User({
    book: {},
    books: [{}],
  });
  user.getProp('name').setErrorCode(100);
  user.getProp('book', 'title').setErrorCode(200);
  user.getProp('books', 0, 'title').setErrorCode(400);
  ctx.deepEqual(user.collectErrors(), [
    { path: ['name'], code: 100 },
    { path: ['book', 'title'], code: 200 },
    { path: ['books', 0, 'title'], code: 400 },
  ]);
});

spec.test('supports JSON types', (ctx) => {
  class User extends Model {
    @prop()
    public name: string;
    @prop()
    public json0: any;
    @prop()
    public json1: any;
    @prop()
    public json2: any;
  }
  const user = new User({
    name: 'foo',
    json0: { foo: 'foo' },
    json1: {},
  });
  user.getProp('name').setErrorCode(100);
  user.getProp('json0').setErrorCode(200);

  ctx.deepEqual(user.collectErrors(), [
    { path: ['name'], code: 100 },
    { path: ['json0'], code: 200 },
  ]);
});

export default spec;
