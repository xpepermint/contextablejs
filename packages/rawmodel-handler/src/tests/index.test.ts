import { Spec } from '@hayspec/spec';
import * as rawmodel from '..';

const spec = new Spec();

spec.test('exposed content', (t) => {
  t.true(!!rawmodel.Handler);
 });

export default spec;