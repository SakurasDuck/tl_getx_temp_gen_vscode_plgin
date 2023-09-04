let _itemState=(name:string,subName:string)=>`
import 'package:tl_getx/tl_getx.dart';

class ${name}ItemState {
  const ${name}ItemState();

}
`;

export var itemState=_itemState;