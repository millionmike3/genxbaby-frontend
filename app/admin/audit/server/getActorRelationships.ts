// app/admin/audit/server/getActorRelationships.ts
export function getActorRelationships(timeline: any[]) {
  const nodes: any[] = [];
  const edges: any[] = [];
  const nodeSet = new Set<string>();

  function addNode(id: string, type: string) {
    const key = `${type}:${id}`;
    if (!nodeSet.has(key)) {
      nodeSet.add(key);
      nodes.push({ id, type });
    }
  }

  for (const item of timeline) {
    const actor =
      item.details?.actor ||
      item.details?.wallet ||
      item.details?.address ||
      null;

    const role = item.details?.role || null;
    const checkId = item.details?.checkId || item.details?.checkNumber || null;

    if (actor) addNode(actor, "actor");
    if (role) addNode(role, "role");
    if (checkId) addNode(checkId, "check");

    if (actor && role) edges.push({ from: actor, to: role, type: "actor-role" });
    if (actor && checkId) edges.push({ from: actor, to: checkId, type: "actor-check" });
    if (role && checkId) edges.push({ from: role, to: checkId, type: "role-check" });
  }

  return { nodes, edges };
}
