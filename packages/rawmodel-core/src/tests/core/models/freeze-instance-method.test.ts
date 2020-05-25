import { Spec } from '@hayspec/spec';
import { Model, prop } from '../../..';

const spec = new Spec();

spec.test('makes property not settable', async (ctx) => {
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
    name: 'foo',
    book: {
      title: 'bar',
    },
    books: [
      {
        title: 'baz',
      },
    ],
  });
  user.freeze();
  ctx.throws(() => user.name = null);
  ctx.throws(() => user.book = null);
  ctx.throws(() => user.book.title = null);
  ctx.throws(() => user.books = null);
  ctx.throws(() => user.books[0].title = null);
});

export default spec;
