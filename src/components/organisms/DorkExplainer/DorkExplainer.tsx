import type { DorkOperator } from '@/types';
import styles from './DorkExplainer.module.css';

export interface DorkExplainerProps {
  operators: DorkOperator[];
  wordLimit?: number;
}

/** Explica o conceito de Google Dorking e lista os operadores suportados. */
export function DorkExplainer({ operators, wordLimit = 32 }: DorkExplainerProps) {
  return (
    <section aria-labelledby="dork-what" className={styles.box}>
      <div className={styles.text}>
        <h2 id="dork-what" className={styles.title}>O que é?</h2>
        <p>
          Google Dorking é usar os <strong>operadores avançados</strong> do Google — como <code>site:</code>, <code>intitle:</code> e <code>-termo</code> — para dizer exatamente onde e o que procurar, em vez de digitar palavras soltas.
        </p>
        <p>
          Para vagas, isso significa buscar direto nas páginas dos sistemas de recrutamento (Greenhouse, Lever, Ashby…), onde muitas vagas aparecem antes — ou sem nunca aparecer — no LinkedIn.
        </p>
        <p className={styles.note}>Use só em páginas públicas e respeite os termos de cada site. O Google considera no máximo {wordLimit} palavras por busca.</p>
      </div>
      <table className={styles.table}>
        <thead>
          <tr><th scope="col">Operador</th><th scope="col">O que faz</th><th scope="col">Exemplo</th></tr>
        </thead>
        <tbody>
          {operators.map((o) => (
            <tr key={o.operator}>
              <td className={styles.op}>{o.operator}</td>
              <td>{o.description}</td>
              <td className={styles.ex}>{o.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
