import PropTypes, { func } from "prop-types";

// load.propTypes = {
//   requestUrl: PropTypes.string,
//   setIsLoading: func,
//   setError: func,
//   setList: func,
//   controller: AbortController,
// };

// export default async function load(
//   requestUrl,
//   setIsLoading,
//   controller,
//   setList
// ) {
//   setIsLoading(true);
//   const signal = controller.signal;
//   try {
//     const res = await fetch(
//       { requestUrl },
//       {
//         signal,
//       }
//     );
//     if (!res.ok) throw new Error(`HTTP ${res.status}`);
//     const json = await res.json();

//     // api_category donne { trivia_categories: [ { id, name }, ... ] }
//     const list = Array.isArray(json.trivia_categories)
//       ? json.trivia_categories
//       : [];
//     setList(list);
//   } catch (err) {
//     // Gestion d'erreur (pour pouvoir Abort)
//     if (err.name !== "AbortError") throw new Error(err);
//   } finally {
//     // Nettoyage
//     setIsLoading(false);
//   }
// }

buildRequest.propTypes = {
  requestBase: PropTypes.string,
  requestAmount: PropTypes.number,
  requestCategory: PropTypes.number, // id
  requestDifficulty: PropTypes.string, // ["easy", "medium", "hard"]
  requestEnd: PropTypes.bool,
};

export function buildRequest(
  requestBase,
  requestAmount,
  requestCategory,
  requestDifficulty,
  requestEnd
) {
  const params = URLSearchParams();
  params.if(requestAmount != null && requestAmount !== "");
  params.append("amount", String(requestAmount));
  if (requestCategory != null && requestCategory !== "")
    params.append("category", String(requestCategory));
  if (requestDifficulty != null && requestDifficulty !== "")
    params.append("difficulty", String(requestDifficulty));
  if (requestEnd && requestEnd !== "") params.append("type", "multiple");

  const toReturn = params.toString();
  return toReturn ? `${requestBase}?${toReturn}` : requestBase;
}
