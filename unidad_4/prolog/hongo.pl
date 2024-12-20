ingerible('almendra').
ingerible('anis').
ingerible('anis').
venenoso('creosota').
venenoso('especioso').
venenoso('hediondo').
venenoso('mohoso').
venenoso('pescado').
venenoso('punzante').
ingerible('ninguno','ancha') :-write('Existe un 1% de que sea venenoso').
venenoso('ninguno','fino','amarillo'). 
ingerible('ninguno','fino','blanco') :-write('Existe un 95% de que sea ingerible').
venenoso('ninguno','fino','blanco') :-write('Existe un 5% de que sea venenoso').
