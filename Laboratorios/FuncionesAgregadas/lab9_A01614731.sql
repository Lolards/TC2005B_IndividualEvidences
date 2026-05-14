SELECT
  COUNT(e.clave) AS "Numero de entregas 1997",
  SUM(e.cantidad) AS "unidades totales",
  SUM(e.cantidad * m.precio * (1 + m.porcentajeimpuesto/100)) AS "Importe Total"
FROM public."Entregan" e
JOIN public."Materiales" m ON e.clave = m.clave
WHERE DATE_PART('year', e.fecha) = 1997;

SELECT
  razonsocial AS "razonSocial Proveedor",
  SUM(importe)  AS "Importe Total",
  COUNT(*)  AS "numeroEntregas"
FROM (
  SELECT
    p.razonsocial,
    e.cantidad * m.precio * (1 + m.porcentajeimpuesto/100) AS importe
  FROM public."Entregan" e
  JOIN public."Proveedores" p ON e.rfc = p.rfc
  JOIN public."Materiales" m ON e.clave = m.clave
) sub
GROUP BY razonsocial
ORDER BY razonsocial;

SELECT
  sub.clave AS "Clave", 
  sub.descripcion AS "descripcion",
  sub.cantidad_total AS "cantidad total",
  sub.max_cantidad AS "maxcantidad",
  sub.min_cantidad AS "minCantidad",
  sub.importe_total AS "Importe Total"
FROM (
  SELECT
    m.clave,
    m.descripcion,
    SUM(e.cantidad) AS cantidad_total,
    MAX(e.cantidad) AS max_cantidad,
    MIN(e.cantidad) AS min_cantidad,
    AVG(e.cantidad) AS avg_cantidad,
    SUM(e.cantidad * m.precio * (1 + m.porcentajeimpuesto/100)) AS importe_total
  FROM public."Entregan" e
  JOIN public."Materiales" m ON e.clave = m.clave
  GROUP BY m.clave, m.descripcion
) sub
WHERE sub.avg_cantidad > 400
ORDER BY sub.clave;

SELECT
  sub.razonsocial AS "RazonSocial",
  sub.promedio AS "PromedioCantidad",
  sub.clave AS "ClaveMaterial",
  sub.descripcion AS "descripcionMaterial"
FROM (
  SELECT
    p.razonsocial,
    m.clave,
    m.descripcion,
    AVG(e.cantidad) AS promedio
  FROM public."Entregan" e
  JOIN public."Proveedores" p ON p.rfc = e.rfc
  JOIN public."Materiales" m ON e.clave = m.clave
  GROUP BY p.rfc, p.razonsocial, m.clave, m.descripcion
) sub
WHERE sub.promedio >= 500
ORDER BY sub.clave, sub.descripcion;

SELECT *
FROM (
SELECT
	p.razonsocial AS "Proveedor",
	m.clave AS "Clave Mat",
	m.descripcion AS "Material",
	AVG(e.cantidad) AS "Cantidad Promedio"
	FROM public."Entregan" e
	JOIN public."Proveedores" p ON e.rfc = p.rfc
	JOIN public."Materiales" m ON e.clave = m.clave
	GROUP BY p.rfc, p.razonsocial, m.clave, m.descripcion
) AS promedios
WHERE "Cantidad Promedio" < 370
OR "Cantidad Promedio" > 450
ORDER BY "Cantidad Promedio";
