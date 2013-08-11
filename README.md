This is a companion module for [streamline.js](https://github.com/Sage/streamlinejs). It wraps node's `fs` functions for streamline's [_fast_ mode](https://github.com/Sage/streamlinejs/wiki/Fast-mode).

It also fixes the odd callback signature of `fs.exists` so that you can call it as `require('streamline-fs').exists(path, _)`.
