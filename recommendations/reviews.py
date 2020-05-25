import spacy
from gensim.corpora import Dictionary
from gensim.models.tfidfmodel import TfidfModel
from gensim.matutils import sparse2full
import numpy as np

nlp  = spacy.load('en_core_web_md')


def nlp_doc(doc):
    def keep_token(t):
        return (t.is_alpha and
                not (t.is_space or t.is_punct or
                     t.is_stop or t.like_num))

    def lemmatize_doc(doc):
        return [t.lemma_ for t in doc if keep_token(t)]

    return lemmatize_doc(nlp(doc))
