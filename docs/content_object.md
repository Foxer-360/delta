# Content Object [back](README.md)

Main idea of content is, that each element in content is object of some type and this object has own content. For now, there are two basic types of object in content

 - Container - which is element of layout, this define *invisible* shape of content
 - Component - which is some real component. This object has no own content, respectively content are data of this component like texts, buttons, etc.

Whole content is a object of type `container` with id `root` and than there is content inside. So valid empty content can looks like

```json
{
  "id": "root",
  "type": "container",
  "content": [],
  "data": {},
  "position": 0,
  "locked": false
}
```
