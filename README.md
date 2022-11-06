# blog-back

## data model

```ts
interface article {
  type: 'card' | 'normal';
  labels: string[];

  title: string;
  content: string; // markdown text

  createAt: Date;
  updateAt: Date;

  comments: Array<{
    name: string;
    url: string;

    ip: string;
    browser: string;
    createAt: string;
  }>;
};
```
