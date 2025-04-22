import { computeBaseline, getStatus } from 'compute-baseline';

const bcdKey = 'css.properties.outline';

const status = computeBaseline({compatKeys: [bcdKey]});

console.log(
  status.toJSON()
);

console.log(getStatus('outline', bcdKey))
